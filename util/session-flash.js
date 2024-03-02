exports.getSessionData = async (req) => {
    const sessionData = await req.session.flashedData;

    req.session.flashedData = null;

    return sessionData
}

exports.flashDataToSession = (req, data, action) => {
    req.session.flashedData = data;
    req.session.save(action)
}