import React, { useState } from 'react'
// import "./category.css"
import axios from 'axios'
import ApiUrl from '../../ApiUrl'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
function AddCountry() {
const [selectedCountry, setSelectedCountry] = useState('');
const navigate=useNavigate()
  const sendData = () => {
    const params = {
      name: selectedCountry.country,
      unit: selectedCountry.currency
    };

    // Code for sending data (e.g., using Axios)
    axios.post(`${ApiUrl}/country/create`, params)
    .then((res) => {
        console.log(res.data);
        if (res.data.status === "ok") {
            toast.success('Country is created');
            setTimeout(() => {
                navigate("/country");
            }, 1000); // Navigating after 2 seconds (adjust the delay as needed)
        } else {
            toast.error(res.data.message);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });

}

const countriesWithCurrencySymbols = [
  { country: 'Afghanistan', currency: 'AFN' },
  { country: 'Albania', currency: 'ALL' },
  { country: 'Algeria', currency: 'DZD' },
  { country: 'Andorra', currency: 'EUR' },
  { country: 'Angola', currency: 'AOA' },
  { country: 'Antigua and Barbuda', currency: 'XCD' },
  { country: 'Argentina', currency: 'ARS' },
  { country: 'Armenia', currency: 'AMD' },
  { country: 'Australia', currency: 'AUD' },
  { country: 'Austria', currency: 'EUR' },
  { country: 'Azerbaijan', currency: 'AZN' },
  { country: 'Bahamas', currency: 'BSD' },
  { country: 'Bahrain', currency: 'BHD' },
  { country: 'Bangladesh', currency: 'BDT' },
  { country: 'Barbados', currency: 'BBD' },
  { country: 'Belarus', currency: 'BYN' },
  { country: 'Belgium', currency: 'EUR' },
  { country: 'Belize', currency: 'BZD' },
  { country: 'Benin', currency: 'XOF' },
  { country: 'Bhutan', currency: 'BTN' },
  { country: 'Bolivia', currency: 'BOB' },
  { country: 'Bosnia and Herzegovina', currency: 'BAM' },
  { country: 'Botswana', currency: 'BWP' },
  { country: 'Brazil', currency: 'BRL' },
  { country: 'Brunei', currency: 'BND' },
  { country: 'Bulgaria', currency: 'BGN' },
  { country: 'Burkina Faso', currency: 'XOF' },
  { country: 'Burundi', currency: 'BIF' },
  { country: 'Cabo Verde', currency: 'CVE' },
  { country: 'Cambodia', currency: 'KHR' },
  { country: 'Cameroon', currency: 'XAF' },
  { country: 'Canada', currency: 'CAD' },
  { country: 'Central African Republic', currency: 'XAF' },
  { country: 'Chad', currency: 'XAF' },
  { country: 'Chile', currency: 'CLP' },
  { country: 'China', currency: 'CNY' },
  { country: 'Colombia', currency: 'COP' },
  { country: 'Comoros', currency: 'KMF' },
  { country: 'Congo', currency: 'XAF' },
  { country: 'Costa Rica', currency: 'CRC' },
  { country: 'Croatia', currency: 'HRK' },
  { country: 'Cuba', currency: 'CUP' },
  { country: 'Cyprus', currency: 'EUR' },
  { country: 'Czech Republic', currency: 'CZK' },
  { country: 'Democratic Republic of the Congo', currency: 'CDF' },
  { country: 'Denmark', currency: 'DKK' },
  { country: 'Djibouti', currency: 'DJF' },
  { country: 'Dominica', currency: 'XCD' },
  { country: 'Dominican Republic', currency: 'DOP' },
  { country: 'East Timor', currency: 'USD' },
  { country: 'Ecuador', currency: 'USD' },
  { country: 'Egypt', currency: 'EGP' },
  { country: 'El Salvador', currency: 'USD' },
  { country: 'Equatorial Guinea', currency: 'XAF' },
  { country: 'Eritrea', currency: 'ERN' },
  { country: 'Estonia', currency: 'EUR' },
  { country: 'Eswatini', currency: 'SZL' },
  { country: 'Ethiopia', currency: 'ETB' },
  { country: 'Fiji', currency: 'FJD' },
  { country: 'Finland', currency: 'EUR' },
  { country: 'France', currency: 'EUR' },
  { country: 'Gabon', currency: 'XAF' },
  { country: 'Gambia', currency: 'GMD' },
  { country: 'Georgia', currency: 'GEL' },
  { country: 'Germany', currency: 'EUR' },
  { country: 'Ghana', currency: 'GHS' },
  { country: 'Greece', currency: 'EUR' },
  { country: 'Grenada', currency: 'XCD' },
  { country: 'Guatemala', currency: 'GTQ' },
  { country: 'Guinea', currency: 'GNF' },
  { country: 'Guinea-Bissau', currency: 'XOF' },
  { country: 'Guyana', currency: 'GYD' },
  { country: 'Haiti', currency: 'HTG' },
  { country: 'Honduras', currency: 'HNL' },
  { country: 'Hungary', currency: 'HUF' },
  { country: 'Iceland', currency: 'ISK' },
  { country: 'India', currency: 'INR' },
  { country: 'Indonesia', currency: 'IDR' },
  { country: 'Iran', currency: 'IRR' },
  { country: 'Iraq', currency: 'IQD' },
  { country: 'Ireland', currency: 'EUR' },
  { country: 'Israel', currency: 'ILS' },
  { country: 'Italy', currency: 'EUR' },
  { country: 'Ivory Coast', currency: 'XOF' },
  { country: 'Jamaica', currency: 'JMD' },
  { country: 'Japan', currency: 'JPY' },
  { country: 'Jordan', currency: 'JOD' },
  { country: 'Kazakhstan', currency: 'KZT' },
  { country: 'Kenya', currency: 'KES' },
  { country: 'Kiribati', currency: 'AUD' },
  { country: 'Kosovo', currency: 'EUR' },
  { country: 'Kuwait', currency: 'KWD' },
  { country: 'Kyrgyzstan', currency: 'KGS' },
  { country: 'Laos', currency: 'LAK' },
  { country: 'Latvia', currency: 'EUR' },
  { country: 'Lebanon', currency: 'LBP' },
  { country: 'Lesotho', currency: 'LSL' },
  { country: 'Liberia', currency: 'LRD' },
  { country: 'Libya', currency: 'LYD' },
  { country: 'Liechtenstein', currency: 'CHF' },
  { country: 'Lithuania', currency: 'EUR' },
  { country: 'Luxembourg', currency: 'EUR' },
  { country: 'Madagascar', currency: 'MGA' },
  { country: 'Malawi', currency: 'MWK' },
  { country: 'Malaysia', currency: 'MYR' },
  { country: 'Maldives', currency: 'MVR' },
  { country: 'Mali', currency: 'XOF' },
  { country: 'Malta', currency: 'EUR' },
  { country: 'Marshall Islands', currency: 'USD' },
  { country: 'Mauritania', currency: 'MRU' },
  { country: 'Mauritius', currency: 'MUR' },
  { country: 'Mexico', currency: 'MXN' },
  { country: 'Micronesia', currency: 'USD' },
  { country: 'Moldova', currency: 'MDL' },
  { country: 'Monaco', currency: 'EUR' },
  { country: 'Mongolia', currency: 'MNT' },
  { country: 'Montenegro', currency: 'EUR' },
  { country: 'Morocco', currency: 'MAD' },
  { country: 'Mozambique', currency: 'MZN' },
  { country: 'Myanmar', currency: 'MMK' },
  { country: 'Namibia', currency: 'NAD' },
  { country: 'Nauru', currency: 'AUD' },
  { country: 'Nepal', currency: 'NPR' },
  { country: 'Netherlands', currency: 'EUR' },
  { country: 'New Zealand', currency: 'NZD' },
  { country: 'Nicaragua', currency: 'NIO' },
  { country: 'Niger', currency: 'XOF' },
  { country: 'Nigeria', currency: 'NGN' },
  { country: 'North Korea', currency: 'KPW' },
  { country: 'North Macedonia', currency: 'MKD' },
  { country: 'Norway', currency: 'NOK' },
  { country: 'Oman', currency: 'OMR' },
  { country: 'Pakistan', currency: 'PKR' },
  { country: 'Palau', currency: 'USD' },
  { country: 'Palestine', currency: 'ILS' },
  { country: 'Panama', currency: 'USD' },
  { country: 'Papua New Guinea', currency: 'PGK' },
  { country: 'Paraguay', currency: 'PYG' },
  { country: 'Peru', currency: 'PEN' },
  { country: 'Philippines', currency: 'PHP' },
  { country: 'Poland', currency: 'PLN' },
  { country: 'Portugal', currency: 'EUR' },
  { country: 'Qatar', currency: 'QAR' },
  { country: 'Romania', currency: 'RON' },
  { country: 'Russia', currency: 'RUB' },
  { country: 'Rwanda', currency: 'RWF' },
  { country: 'Saint Kitts and Nevis', currency: 'XCD' },
  { country: 'Saint Lucia', currency: 'XCD' },
  { country: 'Saint Vincent and the Grenadines', currency: 'XCD' },
  { country: 'Samoa', currency: 'WST' },
  { country: 'San Marino', currency: 'EUR' },
  { country: 'Sao Tome and Principe', currency: 'STN' },
  { country: 'Saudi Arabia', currency: 'SAR' },
  { country: 'Senegal', currency: 'XOF' },
  { country: 'Serbia', currency: 'RSD' },
  { country: 'Seychelles', currency: 'SCR' },
  { country: 'Sierra Leone', currency: 'SLL' },
  { country: 'Singapore', currency: 'SGD' },
  { country: 'Slovakia', currency: 'EUR' },
  { country: 'Slovenia', currency: 'EUR' },
  { country: 'Solomon Islands', currency: 'SBD' },
  { country: 'Somalia', currency: 'SOS' },
  { country: 'South Africa', currency: 'ZAR' },
  { country: 'South Korea', currency: 'KRW' },
  { country: 'South Sudan', currency: 'SSP' },
  { country: 'Spain', currency: 'EUR' },
  { country: 'Sri Lanka', currency: 'LKR' },
  { country: 'Sudan', currency: 'SDG' },
  { country: 'Suriname', currency: 'SRD' },
  { country: 'Sweden', currency: 'SEK' },
  { country: 'Switzerland', currency: 'CHF' },
  { country: 'Syria', currency: 'SYP' },
  { country: 'Taiwan', currency: 'TWD' },
  { country: 'Tajikistan', currency: 'TJS' },
  { country: 'Tanzania', currency: 'TZS' },
  { country: 'Thailand', currency: 'THB' },
  { country: 'Togo', currency: 'XOF' },
  { country: 'Tonga', currency: 'TOP' },
  { country: 'Trinidad and Tobago', currency: 'TTD' },
  { country: 'Tunisia', currency: 'TND' },
  { country: 'Turkey', currency: 'TRY' },
  { country: 'Turkmenistan', currency: 'TMT' },
  { country: 'Tuvalu', currency: 'AUD' },
  { country: 'Uganda', currency: 'UGX' },
  { country: 'Ukraine', currency: 'UAH' },
  { country: 'United Arab Emirates', currency: 'AED' },
  { country: 'United Kingdom', currency: 'GBP' },
  { country: 'United States', currency: 'USD' },
  { country: 'Uruguay', currency: 'UYU' },
  { country: 'Uzbekistan', currency: 'UZS' },
  { country: 'Vanuatu', currency: 'VUV' },
  { country: 'Vatican City', currency: 'EUR' },
  { country: 'Venezuela', currency: 'VES' },
  { country: 'Vietnam', currency: 'VND' },
  { country: 'Yemen', currency: 'YER' },
  { country: 'Zambia', currency: 'ZMW' },
  { country: 'Zimbabwe', currency: 'ZWL' },
  // Add more countries and their currency symbols as needed
];
const handleChange = (event) => {
  const selectedCurrency2 = event.target.value;
  const selectedCountry2 = countriesWithCurrencySymbols.find(country => country.currency === selectedCurrency2);
  if (selectedCountry2){
   setSelectedCountry(selectedCountry2);
  }
};
  return (
    <>
    <ToastContainer/>
      <div
        className="ForForm mt-2"

      >
        <header>Add</header>
        <form 
                                    onSubmit={(e) => {
                            e.preventDefault();
                            sendData(e.target);
                          }}>
          <div className="fo">
            <div className="">

              <div className="fiel d-flex">
                <div className="input-field" style={{ width: "50%",margin:"5px" }}>
                  <label>County</label>
                  <select className="form-select form-select-lg mb-3" onChange={handleChange} >
      <option value="" >Select country</option>
      {countriesWithCurrencySymbols.map((country, index) => (
        <option key={index} value={country.currency}>{country.country}</option>
      ))}
    </select>

                </div>
                <div className="input-field" style={{ width: "50%",margin:"5px" }}>
                  <label>Currency</label>
                  <input
                    type="text"
                    class="form-control"
                    name="fullName"
                    placeholder="name"
                    required
                    value={selectedCountry.currency}
                  />
                </div>
     

               
              </div>
            </div>

           
        
          </div>
          <button className='btn-btn-primary w-100' type='submit'>Submit</button>
          
        </form>
      </div>
    </>
  )
}

export default AddCountry