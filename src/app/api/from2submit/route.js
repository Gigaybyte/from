
import sequelize from "@/app/lib/Sequelize";

export async function POST(req, res) {
  try {
    const formData = await req.json();
    console.log(formData);

    await sequelize.authenticate();

    const query = `
   
      INSERT INTO department (company_id, department_name, department_code, hod_name, hod_email, description)
      VALUES (:value1, :value2,:value3, :value4, :value5, :value6);

    `;

    await sequelize.query(query, {
      replacements: {
        value1: formData.companyType,
        value2: formData.DepartmentName,
        value3: formData.Departmentcode,
        value4: formData.HODName,
        value5: formData.HODEmail,
        value6: formData.Description,
      
      },
      type: sequelize.QueryTypes.INSERT,
    });

    console.log("Data inserted successfully.");

    return new Response(
      JSON.stringify({ message: "Form submitted successfully!" }),
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
