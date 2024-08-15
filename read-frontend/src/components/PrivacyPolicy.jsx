import React from 'react'
import HeaderComponent from './HeaderComponent'
import { Container } from 'react-bootstrap'

//Component for displaying privacy policy 
const PrivacyPolicy = () => {
  return (
    <div>
        
        <HeaderComponent/>
        <br></br>
        <Container style={{ marginTop: '2cqh',marginBottom:'5cqh', color: '#333' }}>
      <h1 className="text-center" style={{ marginBottom: '4cqh' }}>Privacy Policy</h1>

      <p>
        Welcome to READ. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our reading tutor application. Your privacy is of utmost importance to us, and we are committed to safeguarding your data.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        READ collects personal information that you voluntarily provide when you register for an account, such as your name, email address, and other profile details. We also collect data related to your use of the application, including your reading progress and preferences.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>
        The information we collect is used to enhance your experience with READ. Specifically, we use your data to:
        <ul>
          <li>Provide personalized story recommendations.</li>
          <li>Monitor your reading progress and provide feedback on word pronunciation.</li>
          <li>Improve our application's functionality and user experience.</li>
        </ul>
      </p>

      <h2>3. Data Storage and Security</h2>
      <p>
        We store your data securely on our servers. While we take all necessary precautions to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We strive to use commercially acceptable means to protect your personal data but cannot guarantee its absolute security.
      </p>

      <h2>4. Voice Data</h2>
      <p>
        READ does not save any voice data from your interactions with the application. Your voice is processed in real-time solely for the purpose of providing feedback on pronunciation, and it is not stored or used for any other purpose.
      </p>

      <h2>5. Sharing of Information</h2>
      <p>
        We do not sell, trade, or otherwise transfer your personal information to outside parties. This does not include trusted third parties who assist us in operating our application, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
      </p>

      <h2>6. Changes to This Privacy Policy</h2>
      <p>
        READ may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:rmkyas002@myuct.ac.za">rmkyas002@myuct.ac.za</a>.
      </p>
    </Container>
      
    </div>
  )
}

export default PrivacyPolicy