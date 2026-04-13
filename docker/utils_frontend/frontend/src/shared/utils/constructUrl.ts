const constructUrl = (baseUrl : string) => {
    const token = import.meta.env.VITE_TOKEN;

    return (baseUrl + "?apidogToken=" + token);
}

export default constructUrl