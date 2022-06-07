import * as React from 'react'
import BaseForm from '../components/BaseForm';
import TextInput from '../components/TextInput'
import categoriesValidations from './subcategoriesValidations'
import { axios, history } from '../providers'
import InputContainer from '../components/InputContainer'
import SelectInput from '../components/SelectInput'

const SubcategoriesCreate = () => {
    const [loading, setLoading] = React.useState(false)
    const [categories, setCategories] = React.useState([])

    const handleSubmit = React.useCallback(async (values) => {
        setLoading(true)
        try {
            const { data } = await axios.post(`/subcategories`, values);

            setLoading(false)

            if (data) {
                // notify(`¡Ha registrado el nivel "${data.name}"!`, 'success');
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

    React.useEffect(() => {
        fetchCategories()
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

export default SubcategoriesCreate;
