import * as React from 'react'
import BaseForm from '../components/BaseForm';
import TextInput from '../components/TextInput'
import subcategoriesValidations from './subcategoriesValidations'
import { axios, history } from '../providers'
import InputContainer from '../components/InputContainer'
import { useParams } from 'react-router-dom'
import SelectInput from '../components/SelectInput'

const CategoriesCreate = () => {
    const [loading, setLoading] = React.useState(false)
    const { id } = useParams();
    const [record, setRecord] = React.useState({})
    const [categories, setCategories] = React.useState([])

    const handleSubmit = React.useCallback(async (values) => {
        setLoading(true)
        try {
            const { data } = await axios.put(`/subcategories/${id}`, values);

            setLoading(false)

            if (data) {
                history.push('/subcategories')
            }
        } catch (error) {
            setLoading(false)

            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [])

    const fetchCategories = React.useCallback(async () => {
        const { data } = await axios.get('/categories')

        setCategories(data.data)
    }, [])

    const fetchRecord = React.useCallback(async () => {
        const { data } = await axios.get(`/subcategories/${id}`)

        if (data) {
            setRecord(data)
        }
    }, [])

    React.useState(() => {
        fetchRecord();
        fetchCategories()
    }, [])

    return (
        <BaseForm
            title='Crear categoría'
            validate={subcategoriesValidations}
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
                />
            </InputContainer>
            <InputContainer label='Categoría'>
                <SelectInput
                    name='category_id'
                    placeholder='Categoría'
                    options={categories}
                />
            </InputContainer>
        </BaseForm>
    );
}

export default CategoriesCreate;
