import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const VaccinationForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        formname: '',
        patientName: '',
        age: '',
        vaccineName: '',
        doseNumber: 1,
        appointmentDate: '',
        batchNumber: '',
        administeredBy: '',
        sideEffects: [],
        notes: '',
        status: 'Scheduled'
    });

    const vaccineOptions = ['COVID-19', 'Influenza', 'Hepatitis B', 'MMR', 'Other'];
    const sideEffectOptions = ['Fever', 'alurgy', 'Pain', 'Fatigue', 'Headache', 'None', 'Other'];
    const statusOptions = ['Scheduled', 'Completed', 'Cancelled', 'Missed'];

    useEffect(() => {
        if (id) {
            fetchFormData();
        }
    }, [id]);

    const fetchFormData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/vaccine/${id}`);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching form:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSideEffects = (effect) => {
        setFormData(prev => ({
            ...prev,
            sideEffects: prev.sideEffects.includes(effect)
                ? prev.sideEffects.filter(item => item !== effect)
                : [...prev.sideEffects, effect]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:5000/api/vaccine/update/${id}`, formData);
            } else {
                await axios.post('http://localhost:5000/api/vaccine/create', formData);
            }
            navigate('/vaccine-list');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">
                {id ? 'Update Vaccination Form' : 'New Vaccination Form'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1">Form Name</label>
                        <input
                            type="text"
                            name="formname"
                            value={formData.formname}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Patient Name</label>
                        <input
                            type="text"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                            min="0"
                            max="120"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Vaccine Name</label>
                        <select
                            name="vaccineName"
                            value={formData.vaccineName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Select Vaccine</option>
                            {vaccineOptions.map(vaccine => (
                                <option key={vaccine} value={vaccine}>{vaccine}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Dose Number</label>
                        <input
                            type="number"
                            name="doseNumber"
                            value={formData.doseNumber}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                            min="1"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Appointment Date</label>
                        <input
                            type="datetime-local"
                            name="appointmentDate"
                            value={formData.appointmentDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Batch Number</label>
                        <input
                            type="text"
                            name="batchNumber"
                            value={formData.batchNumber}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Administered By</label>
                        <input
                            type="text"
                            name="administeredBy"
                            value={formData.administeredBy}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1">Side Effects</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {sideEffectOptions.map(effect => (
                            <label key={effect} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.sideEffects.includes(effect)}
                                    onChange={() => handleSideEffects(effect)}
                                    className="mr-2"
                                />
                                {effect}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block mb-1">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Notes</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        maxLength="500"
                        rows="4"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/vaccine-list')}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {id ? 'Update' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VaccinationForm;