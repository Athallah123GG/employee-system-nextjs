"use client"

import React, { useReducer, useState } from 'react'
import { BiPlus, BiCheck } from "react-icons/bi"

interface FormState {
    firstname: string
    lastname: string
    email: string
    salary: string
    date: string
    status: string
}

type FormAction = {
    type: string
    field: string
    value: string
}

const initialState: FormState = {
    firstname: '',
    lastname: '',
    email: '',
    salary: '',
    date: '',
    status: 'active'
}

const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
        case 'SET_INPUT':
            return {
                ...state,
                [action.field]: action.value
            }
        default:
            return state
    }
}

const Form: React.FC = () => {
    const [state, dispatch] = useReducer(formReducer, initialState)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch({ type: 'SET_INPUT', field: name, value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Pengecekan apakah ada field yang kosong
        const isEmptyField = Object.values(state).some(value => value === '')

        if (isEmptyField) {
            setShowModal(true) // Tampilkan modal jika ada field kosong
            return
        }

        console.log(state)

        // Tampilkan notifikasi sukses
        setShowSuccess(true)

        // Tunggu 3 detik untuk menampilkan notifikasi sukses, kemudian refresh halaman
        setTimeout(() => {
            setShowSuccess(false)
            window.location.reload()
        }, 3000)
    }

    return (
        <div>
            {showSuccess ? (
                <Success />
            ) : (
                <form onSubmit={handleSubmit} className='grid lg:grid-cols-2 w-4/6 gap-4'>
                    <div className="input-type">
                        <input
                            type="text"
                            name='firstname'
                            className='border w-full px-5 py-3 focus:outline-none rounded-md'
                            placeholder='FirstName'
                            value={state.firstname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-type">
                        <input
                            type="text"
                            name='lastname'
                            className='border w-full px-5 py-3 focus:outline-none rounded-md'
                            placeholder='Lastname'
                            value={state.lastname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-type">
                        <input
                            type="text"
                            name='email'
                            className='border w-full px-5 py-3 focus:outline-none rounded-md'
                            placeholder='Email'
                            value={state.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-type">
                        <input
                            type="text"
                            name='salary'
                            className='border w-full px-5 py-3 focus:outline-none rounded-md'
                            placeholder='Salary'
                            value={state.salary}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-type">
                        <input
                            type="date"
                            name='date'
                            className='border px-5 py-3 focus:outline-none rounded-md'
                            value={state.date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex gap-10 items-center'>
                        <div className="form-check">
                            <input
                                type="radio"
                                value='active'
                                id='radioDefault1'
                                name='status'
                                checked={state.status === 'active'}
                                onChange={handleChange}
                                className='form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                            />
                            <label htmlFor="radioDefault1" className='inline-block text-gray-800'>Active</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                value='inactive'
                                id='radioDefault2'
                                name='status'
                                checked={state.status === 'inactive'}
                                onChange={handleChange}
                                className='form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-green-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
                            />
                            <label htmlFor="radioDefault2" className='inline-block text-gray-800'>Inactive</label>
                        </div>
                    </div>

                    <button type="submit" className='flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-green-500 hover:text-green-100'>Add <span className='px-1'><BiPlus size={24}></BiPlus></span></button>
                </form>
            )}

            {showModal && <Modal onClose={() => setShowModal(false)} />}
        </div>
    )
}

const Success: React.FC = () => {
    return (
        <div className="success container mx-auto flex justify-center">
            <div className="flex items-center border border-yellow-200 bg-yellow-400 w-3/6 text-gray-900 text-md my-4 py-2 text-center bg-opacity-5">
                <BiCheck size={25} color={"rgb(34,197,94)"} className="mr-2" />
                <span>Data added successfully!</span>
            </div>
        </div>
    )
}

interface ModalProps {
    onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
    return (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg text-center">
                <h2 className="text-lg font-semibold mb-4">No data</h2>
                <p className="mb-4">Please fill in all required fields.</p>
                <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Close</button>
            </div>
        </div>
    )
}

export default Form
