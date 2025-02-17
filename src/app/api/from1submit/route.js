import sequelize from "@/app/lib/Sequelize";
import { createHash } from 'crypto';

export async function POST(req, res) {
  try {
    const formData = await req.json();

    await sequelize.authenticate();
    const uniqueId = createHash('sha256')
      .update(Date.now().toString() + Math.random().toString())
      .digest('hex');

    console.log(uniqueId);

    const query = `
      INSERT INTO company (company_id, company_type, legal_name, trading_name, abn_number, acn_number, arbn_number, incorporation_number, other_license_number)
      VALUES (:uuid, :value1, :value2, :value3, :value4, :value5, :value6, :value7, :value8);
    `;

    await sequelize.query(query, {
      replacements: {
        uuid: uniqueId,
        value1: formData.companyType,
        value2: formData.legalName,
        value3: formData.tradingName,
        value4: formData.abnNumber,
        value5: formData.acnNumber,
        value6: formData.arbnNumber,
        value7: formData.incorporationNumber,
        value8: formData.otherLicenseNumber,
      },
      type: sequelize.QueryTypes.INSERT,
    });

    const selectQuery = ` SELECT *, DATE(insert_at) AS dt FROM company WHERE company_id = :uuid;`;

    const result = await sequelize.query(selectQuery, {
      replacements: {
        uuid: uniqueId,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    console.log("Data inserted successfully.");

    return new Response(
      JSON.stringify({
        message: "Form submitted successfully!",
        data: result[0],
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    return new Response(
      JSON.stringify({
        message: "Error submitting form",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
