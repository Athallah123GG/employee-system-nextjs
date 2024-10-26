interface EmployeeData {
    firstname: string
    lastname: string
    email: string
    salary: string
    date: string
    status: string
}

const API_URL = 'https://your-api-url.com/employees' // Ganti dengan URL API Anda

// Fungsi untuk membuat data employee baru
export const createEmployee = async (employeeData: EmployeeData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeData),
        })

        if (!response.ok) {
            throw new Error('Failed to create employee')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

// Fungsi untuk mendapatkan semua data employee
export const getEmployees = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error('Failed to fetch employees')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

// Fungsi untuk memperbarui data employee
export const updateEmployee = async (id: string, employeeData: EmployeeData) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeData),
        })

        if (!response.ok) {
            throw new Error('Failed to update employee')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

// Fungsi untuk menghapus data employee
export const deleteEmployee = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error('Failed to delete employee')
        }

        return { message: 'Employee deleted successfully' }
    } catch (error) {
        console.error(error)
        throw error
    }
}
