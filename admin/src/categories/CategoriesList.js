import * as React from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search';
import { useMediaQuery } from '@material-ui/core'
import useFetch from '../hooks/useFetch'
import LinkBehavior from '../components/LinkBehavior';
import Table from '../components/Table'
import Spinner from '../components/Spinner'

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
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box width={isSmall ? '100%' : '40%'}>
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
                <Box>
                    <Button color="primary" component={LinkBehavior} to="/categories/create">
                        Crear
                    </Button>
                </Box>
            </Box>
            <Box>
                {!loading ? <Table data={data} /> : (
                    <Box sx={{
                        display: 'flex',
                        padding: '2rem 0'
                    }}>
                        <Spinner />
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default CategoriesList
