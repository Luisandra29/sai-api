const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Ingrese un nombre.';
    }
    if (!values.category_id) {
        errors.category_id = 'Seleccione una categoria.';
    }
    console.log(values)
    return errors;
}

export default validate
