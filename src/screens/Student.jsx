import React, { useEffect, useState } from 'react';
import AddStudent from '../modal/AddStudent';
import EditStudent from '../modal/EditStudent';

const Student = (props) => {
    const [openModal, setOpenModal] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)

    const [studentID, setStudentID] = useState(0)

    const [student, setStudent] = useState([])

    const [personalInfo, setPersonalInfo] = useState({
        fname: '',
        lname: '',
        dob: '',
        email: '',
        phone: ''
    })

    const resetPersonal = () => {
        setPersonalInfo({
            fname: '',
            lname: '',
            dob: '',
            email: '',
            phone: ''
        })
    }

    const toggleModal = () => {
        setOpenModal(() => !openModal)
        resetPersonal()
    }

    const toggleModalEdit = (items) => {
        setOpenModalEdit(() => !openModalEdit)

        setPersonalInfo((previousState) => ({
            ...previousState,
            ...items,
            fname: items.firstName,
            lname: items.lastName

        }))

        setStudentID(items.id)

        // console.log(studentID)

        // console.log(personalInfo)
    }

    const storeInfo = (event) => {
        const { name, value } = event.target
        setPersonalInfo((previousState) => ({
            ...previousState,
            [name]: value
        }))

        // console.log(personalInfo)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch('http://127.0.0.1:8000/api/add-student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(personalInfo)
        }).then((res) => res.json()
        ).then((data) => console.log(data))

        resetPersonal()

        toggleModal()
    }

    const handleSubmitEdit = (event) => {
        event.preventDefault()
        fetch(`http://127.0.0.1:8000/api/update-student/${studentID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(personalInfo)
        })

        resetPersonal()

        setOpenModalEdit(() => !openModalEdit)

    }

    // const getStudents = () => {
    //     fetch('http://127.0.0.1:8000/api/get-student')
    //         .then((res) => res.json())
    //         .then((data) => setStudent(data))

    // }

    const deleteStudent = (valueID) => {
        fetch(`http://127.0.0.1:8000/api/delete-student/${valueID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((data) => console.log(data))

        const updateStudent = student.filter((student) => student.id !== valueID)

        setStudent(updateStudent)

    }

    useEffect(() => {

        fetch('http://127.0.0.1:8000/api/get-student')
            .then((res) => res.json())
            .then((data) => setStudent(data))

    }, [studentID])


    return (
        <div>
            <AddStudent show={openModal} trigger={toggleModal} details={personalInfo} storeInfo={storeInfo} handleSubmit={handleSubmit} />

            <EditStudent show={openModalEdit} trigger={toggleModalEdit} details={personalInfo} storeInfo={storeInfo} handleSubmit={handleSubmitEdit} />

            <div className="m-5 px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Users</h1>
                        <p className="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title, email and role.</p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button type="button" onClick={toggleModal} className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add user</button>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Full Name</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date of Birth</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {
                                            student.map((items) => {
                                                return (
                                                    <tr key={items.id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{items.firstName} {items.lastName}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{items.email}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{items.dob}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{items.phone}</td>
                                                        <td className="relative whitespace-nowrap space-x-2 py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                            <button onClick={() => toggleModalEdit(items)} className="text-indigo-600 hover:text-indigo-900">Edit<span className="sr-only"></span></button>
                                                            <button onClick={() => deleteStudent(items.id)} className="text-red-600 hover:text-red-900">Delete<span className="sr-only"></span></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Student;