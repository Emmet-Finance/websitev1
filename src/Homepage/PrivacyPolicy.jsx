import React from 'react';

import Header from '../HeaderFooter/Header';

import Footer from '../HeaderFooter/Footer';



function PrivacyPolicy() {
  return (
    <div>
      <Header />
      <h1>Privacy Policy</h1>
           <p>Emmet Finance ("Emmet Finance") is committed to protecting and respecting your privacy. This Privacy Policy describes how your personal or behavioral data is collected, used, and stored when you access https://emmet.finance/ (the "Site").</p>

      <h2>2. What does this Privacy Policy cover?</h2>
         <p>This Privacy Policy sets forth our policy for collecting or using personal or behavioral data in connection with users accessing and using the Site.</p>

      <h2>3. The Information We Collect</h2>
      <p>Emmet Finance does not collect your personal information and does not use any automatic tracking technologies. The Emmet Finance application leverages blockchain technologies that use only public information available on the blockchain. You are not required to provide any personal information to the Site. However, the transactions conducted from your wallets are publicly accessible on blockchain networks accessed through the Site.</p>
      <p>Emmet Finance does not store any personal or messaging information or in any way use information to associate or cross-associate wallet data.</p>
      <p>Some Internet browsers include the ability to transmit "Do Not Track" or "DNT" signals. Since uniform standards for "DNT" signals have not been adopted, the Site does not currently process or respond to "DNT" signals.</p>
      <p>Emmet Finance will never collect your seed phrase or private keys. We will never ask you to share your wallet private keys or seed phrase. Never trust anyone or any site that asks you to enter your private keys or similar security information.</p>

      <h2>4. Sharing of Personal Information</h2>
      <p>We do not share or sell the personal information that you provide us with other organizations without your express consent, except as described in this Privacy Policy.</p>

      <h2>5. How we Protect and Store Information</h2>
      <p>The safety and security of your personal information also depends on you. Unauthorized entry or use, hardware or software failure, and other factors may compromise the security of user information at any time.</p>

      <h2>6. International Transfers Of Personal Data</h2>
      <p>If you are a resident of the European Economic Area ("EEA") or Switzerland, you may have additional rights under the General Data Protection Regulation (the "GDPR") and other applicable laws with respect to your Personal Data, as outlined below.</p>

      <h2>7. Social Media</h2>
      <p>We may use social and developer networks such as Discord, Twitter, and Github. When you use them, the operators of the respective social and developer networks may record that you are on such networks. This processing of your personal data lies in the responsibility of these networks and occurs according to their privacy policies. Emmet Finance is not responsible for data collected by these networks. We only use these platforms to inform our community of updates and answer user questions.</p>
      
      <p>If you have any questions about this page or our data practices generally, please contact info@emmet.finance.</p>
      <Footer />

    </div>
  );
}

export default PrivacyPolicy;