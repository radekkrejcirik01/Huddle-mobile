import React from 'react';
import { ScrollView, Text } from 'react-native';
import { PrivacyScreenStyle } from '@screens/account/PrivacyScreen/PrivacyScreen.style';

export const PrivacyScreen = (): JSX.Element => (
    <ScrollView contentContainerStyle={PrivacyScreenStyle.contentContainer}>
        <Text style={PrivacyScreenStyle.title}>Sender App Privacy Policy</Text>
        <Text style={PrivacyScreenStyle.description}>
            Effective Date: 11th of July, 2023. Thank you for using Sender
            ("App"), developed by Sender Inc. We are committed to protecting
            your privacy and ensuring the security of your personal information.
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you use our App. By using the App,
            you consent to the practices described in this Privacy Policy.
            Information We Collect 1.1 Personal Information We may collect
            certain personal information that you voluntarily provide to us when
            you use the App, such as your name, email address, and contact
            information. We may also collect information you choose to share
            through the App's features, including messages, photos, and files.
            1.2 Usage Information When you access or use the App, we may
            automatically collect certain information about your device,
            including your IP address, device type, operating system, and usage
            patterns. This information is used to analyze trends, administer the
            App, and gather demographic information. Use of Information 2.1
            Provide and Improve the App We may use the information we collect to
            provide, maintain, and improve the functionality and performance of
            the App. This includes personalizing your experience,
            troubleshooting issues, and optimizing the App's features and
            services. 2.2 Communication We may use your contact information to
            respond to your inquiries, provide customer support, and send you
            important updates or notifications related to the App. 2.3
            Aggregated Data We may aggregate and anonymize the information
            collected through the App to generate statistical and analytical
            insights. This aggregated data does not personally identify you and
            may be used for various purposes, including research, marketing, and
            improving our services. Disclosure of Information 3.1 Service
            Providers We may share your information with third-party service
            providers who assist us in operating the App, performing functions
            on our behalf, or analyzing how the App is used. These service
            providers have access to your information only to perform these
            tasks on our behalf and are obligated not to disclose or use it for
            any other purpose. 3.2 Legal Requirements We may disclose your
            information if required to do so by law or in response to valid
            requests by public authorities (e.g., a court or government agency).
            We may also disclose your information to enforce our rights, protect
            the security of the App, or investigate and prevent fraudulent or
            illegal activities. 3.3 Business Transfers If we are involved in a
            merger, acquisition, or sale of all or a portion of our assets, your
            information may be transferred as part of that transaction. We will
            notify you via email and/or a prominent notice in the App of any
            change in ownership or uses of your information. Data Security We
            implement reasonable security measures to protect your information
            from unauthorized access, use, or disclosure. However, please be
            aware that no method of transmission over the internet or electronic
            storage is completely secure, and we cannot guarantee absolute
            security. Children's Privacy The App is not intended for use by
            individuals under the age of 18. We do not knowingly collect
            personal information from children. If you believe we may have
            collected information from a child without parental consent, please
            contact us, and we will promptly remove the information from our
            records. Changes to This Privacy Policy We reserve the right to
            modify this Privacy Policy at any time. Any changes will be
            effective immediately upon posting the revised Privacy Policy in the
            App. We encourage you to review this Privacy Policy periodically for
            any updates or changes. Contact Us If you have any questions,
            concerns, or requests regarding this Privacy Policy or our privacy
            practices, please contact us at radek.krejcirik01@gmail.com
        </Text>
    </ScrollView>
);
