import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Schema validasi menggunakan zod
const EmployeeSchema = z.object({
    firstname: z.string().nonempty("Firstname is required"),
    lastname: z.string().nonempty("Lastname is required"),
    email: z.string().email("Invalid email"),
    salary: z.preprocess((val) => parseFloat(val as string), z.number().positive("Salary must be a positive number")),
    date: z.string().nonempty("Date is required")
});

// Create Employee
export const saveEmployee = async (formData: FormData) => {
    const validatedFields = EmployeeSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            Error: validatedFields.error.flatten().fieldErrors
        };
    }

    try {
        const employee = await prisma.employee.create({
            data: {
                firstname: validatedFields.data.firstname,
                lastname: validatedFields.data.lastname,
                email: validatedFields.data.email,
                salary: validatedFields.data.salary,
                date: new Date(validatedFields.data.date)
            }
        });
        return employee; // Return created employee data
    } catch (error) {
        console.error("Error creating employee:", error);
        return { message: "Failed to create Employee" };
    }
};

// Read All Employees
export const getEmployees = async () => {
    try {
        const employees = await prisma.employee.findMany();
        return employees;
    } catch (error) {
        console.error("Error fetching employees:", error);
        return { message: "Failed to fetch employees" };
    }
};

// Read Employee by ID
export const getEmployeeById = async (id: string) => {
    try {
        const employee = await prisma.employee.findUnique({
            where: { id }
        });
        return employee;
    } catch (error) {
        console.error("Error fetching employee:", error);
        return { message: "Failed to fetch employee" };
    }
};

// Update Employee
export const updateEmployee = async (id: string, formData: FormData) => {
    const validatedFields = EmployeeSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            Error: validatedFields.error.flatten().fieldErrors
        };
    }

    try {
        const employee = await prisma.employee.update({
            where: { id },
            data: {
                firstname: validatedFields.data.firstname,
                lastname: validatedFields.data.lastname,
                email: validatedFields.data.email,
                salary: validatedFields.data.salary,
                date: new Date(validatedFields.data.date)
            }
        });
        return employee; // Return updated employee data
    } catch (error) {
        console.error("Error updating employee:", error);
        return { message: "Failed to update Employee" };
    }
};

// Delete Employee
export const deleteEmployee = async (id: string) => {
    try {
        await prisma.employee.delete({
            where: { id }
        });
        return { message: "Employee deleted successfully" };
    } catch (error) {
        console.error("Error deleting employee:", error);
        return { message: "Failed to delete Employee" };
    }
};
