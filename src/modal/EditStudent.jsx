import React from "react";
import ReactDOM from "react-dom";

const EditStudent = ({ show, trigger, details, storeInfo, handleSubmit }) => {
    const formDetails = [
        { id: 1, type: 'text', name: 'fname', label: 'First Name', value: details.fname },
        { id: 2, type: 'text', name: 'lname', label: 'Last Name', value: details.lname },
        { id: 3, type: 'email', name: 'email', label: 'Email', value: details.email },
        { id: 4, type: 'date', name: 'dob', label: 'Date of Birth', value: details.dob },
        { id: 5, type: 'number', name: 'phone', label: 'Phone Number', value: details.phone },
    ]

    return (!show)
        ? null
        : ReactDOM.createPortal(
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>

                    <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">

                        <div className="mt-10 sm:mt-0">


                            <div className="mt-5 md:mt-0 md:col-span-2">
                                <form onSubmit={handleSubmit}>
                                    <div className="shadow overflow-hidden sm:rounded-md">
                                        <div className="px-4 py-5 bg-white sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">

                                                {
                                                    formDetails.map((inputType) => {
                                                        return (
                                                            <div key={inputType.id} className="col-span-6 sm:col-span-3">
                                                                <label key={inputType.name} htmlFor={inputType.name} className="block text-sm font-medium text-gray-700">{inputType.label}</label>
                                                                <input type={inputType.type} name={inputType.name} id={inputType.id} onChange={storeInfo} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder={`Please Enter ${inputType.label}`} value={inputType.value} />
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>

                                        <div className="px-4 py-3 space-x-4 bg-gray-50 text-right sm:px-6">
                                            <button onClick={trigger} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>

                                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
            , document.getElementById('Edit')
        )

}

export default EditStudent