import * as React from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search';
import { useMediaQuery } from '@material-ui/core'
import useFetch from '../hooks/useFetch'

const CategoriesList = () => {
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )
    const [filter, setFilter] = React.useState({})
    const {
        loading,
        error,
        data,
        hasMore
    } = useFetch('/categories', {
        perPage: 10,
        page: 1,
        filter: filter
    })

    const handleOnChange = (e) => {
        if (e.currentTarget.value) {
            setFilter({
                name: e.currentTarget.value
            })
        } else {
            setFilter({})
        }
    }

    return (
        <Box display='flex' flexDirection='column'>
            <Box width={isSmall ? '100%' : '636px'}>
                <TextField
                    onChange={handleOnChange}
                    InputProps={{
                        startAdornment: (
                            <Box marginLeft='6px' display='flex'>
                                <SearchIcon />
                            </Box>
                        )
                    }}
                    placeholder='Buscar'
                    fullWidth
                />
            </Box>
        </Box>
    )
}

export default CategoriesList
