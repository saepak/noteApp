import React from 'react'

const getStyles = () =>({
    title: {
        textAlign: 'center',
        fontSize: 30,
        padding: 30
    }
})

const Title = () => {
    const styles = getStyles()

    return <h1 style={styles.title}>MY TO-DO LIST</h1>
}


export default Title