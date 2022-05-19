import * as React from 'react'
import BaseForm from '../components/BaseForm';
import TextInput from '../components/TextInput'
import categoriesValidations from './categoriesValidations'
import { axios, history } from '../providers'
import InputContainer from '../components/InputContainer'

const CategoriesCreate = props => {
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = React.useCallback(async (values) => {
        setLoading(true)
        try {
            const { data } = await axios.post(`/categories`, values);

            setLoading(false)

            if (data) {
                // notify(`¡Ha registrado el nivel "${data.name}"!`, 'success');
                history.push('/categories')
            }
        } catch (error) {
            setLoading(false)

            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [])

    return (
        <BaseForm
            title='Crear categoría'
            validate={categoriesValidations}
            loading={loading}
            unresponsive
            onSubmit={handleSubmit}
        >
            <InputContainer label='Nombre'>
                <TextInput
                    name='name'
                    placeholder="Nombre de la nueva categoría"
                    fullWidth
                />
            </InputContainer>
        </BaseForm>
    );
}

export default CategoriesCreate;
