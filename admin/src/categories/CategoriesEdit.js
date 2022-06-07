import * as React from 'react'
import BaseForm from '../components/BaseForm';
import TextInput from '../components/TextInput'
import categoriesValidations from './categoriesValidations'
import { axios, history } from '../providers'
import InputContainer from '../components/InputContainer'
import { useParams } from 'react-router-dom'

const CategoriesCreate = () => {
    const [loading, setLoading] = React.useState(false)
    const { id } = useParams();
    const [record, setRecord] = React.useState({})

    const handleSubmit = React.useCallback(async (values) => {
        setLoading(true)
        try {
            const { data } = await axios.put(`/categories/${id}`, values);

            setLoading(false)

            if (data) {
                history.push('/categories')
            }
        } catch (error) {
            setLoading(false)

            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [])

    const fetchRecord = async () => {
        const { data } = await axios.get(`/categories/${id}`)

        if (data) {
            setRecord(data)
        }
    }

    React.useState(() => {
        fetchRecord();
    }, [])

    return (
        <BaseForm
            title='Crear categoría'
            validate={categoriesValidations}
            loading={loading}
            unresponsive
            onSubmit={handleSubmit}
            record={record}
        >
            <InputContainer label='Nombre'>
                <TextInput
                    name='name'
                    placeholder="Nombre de la nueva categoría"
                    fullWidth
                    source='name'
                />
            </InputContainer>
        </BaseForm>
    );
}

export default CategoriesCreate;
