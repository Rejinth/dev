 import React,{useState,useEffect} from 'react';
 import { useLocation } from 'react-router-dom';
 import axios from 'axios'
 function Dashboard() {
    const location = useLocation();
    const { isAdmin } = location.state || {};

    const [vaccinationForms, setVaccinationForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/all'); // Your backend URL
        setVaccinationForms(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vaccination forms:', error);
        setLoading(false);
      }
    };
    fetchForms();
  }, []);



console.log("isAdmin",isAdmin)
    if(isAdmin){
        return (
            <div className="container mt-5">
              <h2>Vaccination Appointment Details</h2>
        
              {loading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Patient Name</th>
                      <th scope="col">Vaccine Name</th>
                      <th scope="col">Appointment Date</th>
                      <th scope="col">Side Effects</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vaccinationForms.length > 0 ? (
                      vaccinationForms.map((form) => (
                        <tr key={form._id}>
                          <td>{form.patientName}</td>
                          <td>{form.vaccineName}</td>
                          <td>{new Date(form.appointmentDate).toLocaleString()}</td>
                          <td>{form.sideEffects.join(', ')}</td>
                          <td>{form.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No forms available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          );
    }
   return (
     <div className="container mt-5">
       <h2>Welcome to User Dashboard</h2>
       <p>This is the dashboard where you can manage your data.</p>
     </div>
   );
 }
 
 export default Dashboard;
 