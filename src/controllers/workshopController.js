const Workshop = require('../models/workshopModel'); 

const workshopController = {
    
    createWorkshop: async (req, res) => {
        try {
            const workshopData = req.body; 
            const workshopId = await Workshop.create(workshopData); 
            res.status(201).json({ message: 'Workshop created', id: workshopId });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

   
    getAllWorkshops: async (req, res) => {
        try {
            const workshops = await Workshop.getAll(); 
            res.status(200).json(workshops);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get a single workshop by ID
    getWorkshopById: async (req, res) => {
        try {
            const workshopId = req.params.id; // Extract ID from the URL
            const workshop = await Workshop.getById(workshopId); // Fetch workshop by ID
            if (!workshop) {
                return res.status(404).json({ message: 'Workshop not found' });
            }
            res.status(200).json(workshop);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    updateWorkshop: async (req, res) => {
        try {
            const workshopId = req.params.id; 
            const updatedData = req.body; 
            await Workshop.update(workshopId, updatedData); 
            res.status(200).json({ message: 'Workshop updated' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },


    deleteWorkshop: async (req, res) => {
        try {
            const workshopId = req.params.id; 
            await Workshop.delete(workshopId);
            res.status(200).json({ message: 'Workshop deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = workshopController; 
