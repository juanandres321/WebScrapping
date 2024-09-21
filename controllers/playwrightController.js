const { scrapeLinks, info } = require('../services/playwrightService');

const getInfo = async (req, res) => {
    const { startDate, endDate, terms } = req.query;

    try {
        const linksArray = await info(startDate, endDate, terms); 
        res.json({
            success: true,
            data: linksArray
        });
    } catch (error) {
        console.error("Error en el controlador:", error);
        res.status(500).json({ success: false, message: 'Error al obtener los enlaces' });
    }
};

module.exports = {
    getInfo
};

