import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
    pageContainer: {
        padding: '15px'
    },
    storeItem: {
        borderRadius:50,
        height: 70,
        width:70,
        borderStyle: 'solid',
        borderWidth:2,
        borderColor: 'black',
        marginLeft: '10px',
        marginBottom: '10px'
    },
    productsContainer: {
        display: 'flex',
        width: '90%',
        flexWrap: 'wrap'
    },
    ellipse: {
        backgroundColor: 'gray',
        margin: '50px 20px 0px 0px',
        zIndex: 1000
    },
    avatarCoins: {
        backgroundColor: 'gray',
        margin: ' 6px 0px 0px -5px',
        zIndex: 1000
    },
    coinImg:{
        display: 'flex',
        height:18
    },
    sum: {
        color:'gold',
        fontWeight:'bold',
        fontSize:'16px',
        width:'100%',
        textAlign:'center',
    },
    avatarContainer: {
        height:70
    },
    avatarCard: {
        marginBottom: 10,
        marginLeft:10,
        height: 80,
        width: '45%',
        borderRadius: '20px'
    }
}))
