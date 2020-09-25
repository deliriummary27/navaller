export const updateState = (oldstate, updatedItems) => {
    return {
        ...oldstate,
        ...updatedItems
    }
}