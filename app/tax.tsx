import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { ProgressSteps, ProgressStep } from '@ouedraogof/react-native-progress-steps';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ProgressStepsComponent = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            taxRegime: '',
            salary: '',
            bonus: '',
            rentalIncome: '',
            municipalTax: '',
            bankInterest: '',
            dividend: '',
            otherIncome: '',
            propertySaleGain: '',
            section80C: '',
            section80D: '',
            section80G: '',
            otherDeductions: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            taxRegime: Yup.string().required('Tax regime is required'),
            salary: Yup.number().required('Salary is required').positive('Must be a positive number'),
            bonus: Yup.number().required('Bonus is required').positive('Must be a positive number'),
            rentalIncome: Yup.number().required('Rental income is required').positive('Must be a positive number'),
            municipalTax: Yup.number().required('Municipal tax is required').positive('Must be a positive number'),
            bankInterest: Yup.number().required('Bank interest is required').positive('Must be a positive number'),
            dividend: Yup.number().required('Dividend is required').positive('Must be a positive number'),
            otherIncome: Yup.number().required('Other income is required').positive('Must be a positive number'),
            propertySaleGain: Yup.number().required('Property sale gain is required').positive('Must be a positive number'),
            section80C: Yup.number().required('Section 80C deduction is required').positive('Must be a positive number'),
            section80D: Yup.number().required('Section 80D deduction is required').positive('Must be a positive number'),
            section80G: Yup.number().required('Section 80G deduction is required').positive('Must be a positive number'),
        }),
        onSubmit: values => {
            const totalIncome = parseFloat(values.salary) + parseFloat(values.bonus) + parseFloat(values.rentalIncome) + parseFloat(values.bankInterest) + parseFloat(values.dividend) + parseFloat(values.otherIncome) + parseFloat(values.propertySaleGain);
            console.log("totall - ", totalIncome);

            const totalDeductions = parseFloat(values.section80C) + parseFloat(values.section80D) + parseFloat(values.section80G)

            const taxableIncome = totalIncome - totalDeductions;
            console.log("totall - ", totalIncome, totalDeductions, taxableIncome, values);
            let tax = 0;

            if (values.taxRegime === 'Old') {

                if (taxableIncome <= 250000) {
                    tax = 0;
                } else if (taxableIncome <= 500000) {
                    tax = (taxableIncome - 250000) * 0.05;
                } else if (taxableIncome <= 1000000) {
                    tax = (taxableIncome - 500000) * 0.2 + 12500;
                } else {
                    tax = (taxableIncome - 1000000) * 0.3 + 112500;
                }
            } else if (values.taxRegime === 'New') {

                if (taxableIncome <= 250000) {
                    tax = 0;
                } else if (taxableIncome <= 500000) {
                    tax = (taxableIncome - 250000) * 0.05;
                } else if (taxableIncome <= 750000) {
                    tax = (taxableIncome - 500000) * 0.1 + 12500;
                } else if (taxableIncome <= 1000000) {
                    tax = (taxableIncome - 750000) * 0.15 + 37500;
                } else if (taxableIncome <= 1250000) {
                    tax = (taxableIncome - 1000000) * 0.2 + 75000;
                } else if (taxableIncome <= 1500000) {
                    tax = (taxableIncome - 1250000) * 0.25 + 125000;
                } else {
                    tax = (taxableIncome - 1500000) * 0.3 + 187500;
                }
            }

            console.log(`Taxable Income: ${taxableIncome}, Tax: ${tax}`);
            alert(`Your calculated tax is: ₹${tax}`);
        },
    });


    const handleStep1Validation = async () => {
        const step1Fields = ['name', 'taxRegime'];
        const errors = await formik.validateForm();
        const step1Errors = step1Fields.filter(field => errors[field]);
        console.log("step1Errors ", step1Errors);
        console.log(Object.keys(formik.errors).some((val) => step1Errors.includes(val)));

        formik.setTouched(step1Errors.reduce((acc, field) => ({ ...acc, [field]: true }), {}));
    };

    const handleStep2Validation = async () => {
        const step2Fields = ['salary', 'bonus', 'rentalIncome', 'municipalTax', 'bankInterest', 'dividend', 'otherIncome', 'propertySaleGain'];
        const errors = await formik.validateForm();
        const step2Errors = step2Fields.filter(field => errors[field]);
        formik.setTouched(step2Errors.reduce((acc, field) => ({ ...acc, [field]: true }), {}));
    };

    const handleStep3Validation = async () => {
        const step3Fields = ['section80C', 'section80D', 'section80G', 'otherDeductions'];
        const errors = await formik.validateForm();
        const step3Errors = step3Fields.filter(field => errors[field]);
        formik.setTouched(step3Errors.reduce((acc, field) => ({ ...acc, [field]: true }), {}));
        if (step3Errors.length === 0) {
            formik.handleSubmit();
        }
    };

    return (
        <View style={styles.container}>
            <ProgressSteps>
                <ProgressStep
                    label="Basic Information"
                    onNext={handleStep1Validation}
                    onPrevious={formik.handleSubmit}
                // errors={true}
                >
                    <View>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={formik.values.name}
                            onChangeText={formik.handleChange('name')}
                            onBlur={formik.handleBlur('name')}
                        />
                        {formik.touched.name && formik.errors.name ? <Text style={styles.error}>{formik.errors.name}</Text> : null}
                        <Text style={styles.label}>Which tax regime do you prefer?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Tax Regime (Old/New)"
                            value={formik.values.taxRegime}
                            onChangeText={formik.handleChange('taxRegime')}
                            onBlur={formik.handleBlur('taxRegime')}
                        />
                        {formik.touched.taxRegime && formik.errors.taxRegime ? <Text style={styles.error}>{formik.errors.taxRegime}</Text> : null}
                    </View>
                </ProgressStep>

                <ProgressStep
                    label="Income Details"
                    onNext={handleStep2Validation}
                // errors={Object.keys(formik.errors).length > 0}
                >
                    <ScrollView>
                        <Text style={styles.label}>Can you tell us the total salary given by your employer?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Total Salary"
                            value={formik.values.salary}
                            onChangeText={formik.handleChange('salary')}
                            onBlur={formik.handleBlur('salary')}
                        />
                        {formik.touched.salary && formik.errors.salary ? <Text style={styles.error}>{formik.errors.salary}</Text> : null}
                        <Text style={styles.label}>Did you receive any bonuses or commissions this year?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Total Bonus"
                            value={formik.values.bonus}
                            onChangeText={formik.handleChange('bonus')}
                            onBlur={formik.handleBlur('bonus')}
                        />
                        {formik.touched.bonus && formik.errors.bonus ? <Text style={styles.error}>{formik.errors.bonus}</Text> : null}
                        <Text style={styles.label}>How much rental income did you receive this year?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Total Rental Income"
                            value={formik.values.rentalIncome}
                            onChangeText={formik.handleChange('rentalIncome')}
                            onBlur={formik.handleBlur('rentalIncome')}
                        />
                        {formik.touched.rentalIncome && formik.errors.rentalIncome ? <Text style={styles.error}>{formik.errors.rentalIncome}</Text> : null}
                        <Text style={styles.label}>Did you pay any municipal taxes on the property? How much?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Total Municipal Tax"
                            value={formik.values.municipalTax}
                            onChangeText={formik.handleChange('municipalTax')}
                            onBlur={formik.handleBlur('municipalTax')}
                        />
                        {formik.touched.municipalTax && formik.errors.municipalTax ? <Text style={styles.error}>{formik.errors.municipalTax}</Text> : null}
                        <Text style={styles.label}>Do you earn any interest from bank accounts?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Total Interest from Bank"
                            value={formik.values.bankInterest}
                            onChangeText={formik.handleChange('bankInterest')}
                            onBlur={formik.handleBlur('bankInterest')}
                        />
                        {formik.touched.bankInterest && formik.errors.bankInterest ? <Text style={styles.error}>{formik.errors.bankInterest}</Text> : null}
                        <Text style={styles.label}>Did you receive any dividend income?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Total Dividend"
                            value={formik.values.dividend}
                            onChangeText={formik.handleChange('dividend')}
                            onBlur={formik.handleBlur('dividend')}
                        />
                        {formik.touched.dividend && formik.errors.dividend ? <Text style={styles.error}>{formik.errors.dividend}</Text> : null}
                        <Text style={styles.label}>Do you have any other sources of income, like gifts or winnings?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Total Other Sources Income"
                            value={formik.values.otherIncome}
                            onChangeText={formik.handleChange('otherIncome')}
                            onBlur={formik.handleBlur('otherIncome')}
                        />
                        {formik.touched.otherIncome && formik.errors.otherIncome ? <Text style={styles.error}>{formik.errors.otherIncome}</Text> : null}
                        <Text style={styles.label}>Did you sell any property this year?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Total Gain from Property Sale"
                            value={formik.values.propertySaleGain}
                            onChangeText={formik.handleChange('propertySaleGain')}
                            onBlur={formik.handleBlur('propertySaleGain')}
                        />
                        {formik.touched.propertySaleGain && formik.errors.propertySaleGain ? <Text style={styles.error}>{formik.errors.propertySaleGain}</Text> : null}
                    </ScrollView>
                </ProgressStep>

                <ProgressStep
                    label="Deductions"
                    onSubmit={handleStep3Validation}
                // errors={Object.keys(formik.errors).length > 0}
                >
                    <ScrollView>
                        <Text style={styles.label}>Enter your Section 80C deductions (e.g., PPF, LIC, etc.)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Section 80C Deductions"
                            value={formik.values.section80C}
                            onChangeText={formik.handleChange('section80C')}
                            onBlur={formik.handleBlur('section80C')}
                        />
                        {formik.touched.section80C && formik.errors.section80C ? <Text style={styles.error}>{formik.errors.section80C}</Text> : null}
                        <Text style={styles.label}>Enter your Section 80D deductions (Medical Insurance)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Section 80D Deductions"
                            value={formik.values.section80D}
                            onChangeText={formik.handleChange('section80D')}
                            onBlur={formik.handleBlur('section80D')}
                        />
                        {formik.touched.section80D && formik.errors.section80D ? <Text style={styles.error}>{formik.errors.section80D}</Text> : null}
                        <Text style={styles.label}>Enter your Section 80G deductions (Donations)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Section 80G Deductions"
                            value={formik.values.section80G}
                            onChangeText={formik.handleChange('section80G')}
                            onBlur={formik.handleBlur('section80G')}
                        />
                        {formik.touched.section80G && formik.errors.section80G ? <Text style={styles.error}>{formik.errors.section80G}</Text> : null}
                    </ScrollView>
                </ProgressStep>
            </ProgressSteps>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginHorizontal: 5,
        marginTop: 10
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#e8f5e9',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        marginTop: 10
    },
    error: {
        fontSize: 12,
        color: 'red',
        marginHorizontal: 5,
    },
});

export default ProgressStepsComponent;
