import { Box } from "@chakra-ui/react"

export const ShadowBox = ({height, children}) =>{
    return (
        <Box 
            display={'flex'} 
            justifyContent={'flex-start'} 
            border={'1px'} 
            padding={'5px'}
            borderRadius={'10px'} 
            boxShadow={'dark-lg'} 
            alignItems={'center'} 
            flexDirection={"column"} 
            width={'100%'}
            height={height}
        >
            {children}
        </Box>
    )
}