import React from 'react';
import { ScrollView, Text } from 'react-native';
import { PrivacyScreenStyle } from '@screens/account/PrivacyScreen/PrivacyScreen.style';

export const PrivacyScreen = (): JSX.Element => (
    <ScrollView contentContainerStyle={PrivacyScreenStyle.contentContainer}>
        <Text style={PrivacyScreenStyle.title}>
            End-User License Agreement (EULA) of Sender
        </Text>
        <Text style={PrivacyScreenStyle.description}>
            This End-User License Agreement ("EULA") is a legal agreement
            between you and Sender This EULA agreement governs your acquisition
            and use of our Sender software ("Software") directly from Sender or
            indirectly through a Sender authorized reseller or distributor (a
            "Reseller"). Please read this EULA agreement carefully before
            completing the installation process and using the Sender software.
            It provides a license to use the Sender software and contains
            warranty information and liability disclaimers. If you register for
            a free trial of the Sender software, this EULA agreement will also
            govern that trial. By clicking "accept" or installing and/or using
            the Sender software, you are confirming your acceptance of the
            Software and agreeing to become bound by the terms of this EULA
            agreement. If you are entering into this EULA agreement on behalf of
            a company or other legal entity, you represent that you have the
            authority to bind such entity and its affiliates to these terms and
            conditions. If you do not have such authority or if you do not agree
            with the terms and conditions of this EULA agreement, do not install
            or use the Software, and you must not accept this EULA agreement.
            This EULA agreement shall apply only to the Software supplied by
            Sender herewith regardless of whether other software is referred to
            or described herein. The terms also apply to any Sender updates,
            supplements, Internet-based services, and support services for the
            Software, unless other terms accompany those items on delivery. If
            so, those terms apply.
        </Text>
        <Text style={PrivacyScreenStyle.title}>License Grant</Text>
        <Text style={PrivacyScreenStyle.description}>
            Sender hereby grants you a personal, non-transferable, non-exclusive
            licence to use the Sender software on your devices in accordance
            with the terms of this EULA agreement. You are permitted to load the
            Sender software (for example a PC, laptop, mobile or tablet) under
            your control. You are responsible for ensuring your device meets the
            minimum requirements of the Sender software. You are not permitted
            to: Edit, alter, modify, adapt, translate or otherwise change the
            whole or any part of the Software nor permit the whole or any part
            of the Software to be combined with or become incorporated in any
            other software, nor decompile, disassemble or reverse engineer the
            Software or attempt to do any such things Reproduce, copy,
            distribute, resell or otherwise use the Software for any commercial
            purpose Allow any third party to use the Software on behalf of or
            for the benefit of any third party Use the Software in any way which
            breaches any applicable local, national or international law use the
            Software for any purpose that Sender considers is a breach of this
            EULA agreement
        </Text>
        <Text style={PrivacyScreenStyle.title}>
            Intellectual Property and Ownership
        </Text>
        <Text style={PrivacyScreenStyle.description}>
            Sender shall at all times retain ownership of the Software as
            originally downloaded by you and all subsequent downloads of the
            Software by you. The Software (and the copyright, and other
            intellectual property rights of whatever nature in the Software,
            including any modifications made thereto) are and shall remain the
            property of Sender. Sender reserves the right to grant licences to
            use the Software to third parties.
        </Text>
        <Text style={PrivacyScreenStyle.title}>Termination</Text>
        <Text style={PrivacyScreenStyle.description}>
            This EULA agreement is effective from the date you first use the
            Software and shall continue until terminated. You may terminate it
            at any time upon written notice to Sender. It will also terminate
            immediately if you fail to comply with any term of this EULA
            agreement. Upon such termination, the licenses granted by this EULA
            agreement will immediately terminate and you agree to stop all
            access and use of the Software. The provisions that by their nature
            continue and survive will survive any termination of this EULA
            agreement. This EULA was created by App EULA Template Generator from
            App-Privacy-Policy.com for Sender
        </Text>
        <Text style={PrivacyScreenStyle.title}>Governing Law</Text>
        <Text style={PrivacyScreenStyle.description}>
            This EULA agreement, and any dispute arising out of or in connection
            with this EULA agreement, shall be governed by and construed in
            accordance with the laws of cz.
        </Text>
    </ScrollView>
);
