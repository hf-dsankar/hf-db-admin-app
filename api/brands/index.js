// v3 Azure Functions (Node 14/16), CommonJS style

const { DefaultAzureCredential } = require("@azure/identity");
const sql = require("mssql");

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";
const SQL_SERVER = process.env.SQL_SERVER; 
const SQL_DB = process.env.SQL_DB;

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

let poolPromise = null;
async function getPool() {
  if (!SQL_SERVER || !SQL_DB) {
    throw new Error("SQL_SERVER and SQL_DB must be set");
  }
  if (!poolPromise) {
    const cred = new DefaultAzureCredential();
    const { token } = await cred.getToken("https://database.windows.net/.default");

    const config = {
      server: SQL_SERVER,
      database: SQL_DB,
      options: { encrypt: true, trustServerCertificate: false, port: 1433 },
      authentication: {
        type: "azure-active-directory-access-token",
        options: { token }
      }
    };

    poolPromise = new sql.ConnectionPool(config)
      .connect()
      .catch(err => {
        poolPromise = null;
        throw err;
      });
  }
  return poolPromise;
}

module.exports = async function (context, req) {
  context.log("Brands function started");
  try {
    if (req.method === "OPTIONS") {
      context.res = { status: 204, headers: corsHeaders() };
      return;
    }
    if (req.method !== "POST") {
      context.res = {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders() },
        body: { success: false, error: "Method not allowed. Use POST." },
      };
      return;
    }

    const payload = req.body;
    if (!Array.isArray(payload)) {
      context.res = {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders() },
        body: { success: false, error: "Request body must be an array of brand records." },
      };
      return;
    }

    const pool = await getPool();

    const results = [];
    const errors = [];

    for (let i = 0; i < payload.length; i++) {
      const record = payload[i];
      try {
        if (!record?.Brand || record?.Vendor_ID == null) {
          throw new Error("Brand and Vendor_ID are required");
        }

        await pool
          .request()
          .input("Brand", sql.NVarChar, record.Brand)
          .input("ActiveBrand", sql.Bit, !!record.ActiveBrand)
          .input("Analytics", sql.Bit, !!record.Analytics)
          .input("WFM_Name", sql.NVarChar, record.WFM_Name || "")
          .input("Vendor_ID", sql.Int, Number(record.Vendor_ID))
          .input("Key_Account", sql.Bit, !!record.Key_Account)
          .input("Category_Review", sql.Bit, !!record.Category_Review)
          .input("Natural", sql.Bit, !!record.Natural)
          .query(`
            INSERT INTO dbo.Brands (
              Brand, ActiveBrand, Analytics, WFM_Name, Vendor_ID, Key_Account, Category_Review, Natural
            )
            VALUES (
              @Brand, @ActiveBrand, @Analytics, @WFM_Name, @Vendor_ID, @Key_Account, @Category_Review, @Natural
            )
          `);

        results.push({ index: i + 1, brand: record.Brand, vendorId: record.Vendor_ID, success: true });
      } catch (err) {
        const msg = err?.originalError?.info?.message || err?.message || String(err);
        context.log(`Insert error at record ${i + 1}:`, msg);
        errors.push(`Record ${i + 1}${record?.Brand ? ` (${record.Brand})` : ""}: ${msg}`);
      }
    }

    let status = 200;
    let message = `Inserted ${results.length} record(s)`;
    if (errors.length && results.length) {
      status = 207;
      message = `Partially successful: ${results.length} inserted, ${errors.length} failed`;
    } else if (errors.length && !results.length) {
      status = 400;
      message = `All records failed to insert`;
    }

    context.res = {
      status,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
      body: { success: errors.length === 0, message, data: results, errors },
    };
  } catch (err) {
    context.log("Function error:", err?.message, err?.stack);
    context.res = {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
      body: { success: false, error: err?.message || "Internal server error" },
    };
  }
};
