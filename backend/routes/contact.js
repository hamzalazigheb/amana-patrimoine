const express = require('express');
const router = express.Router();

// Store appointments (in production, use a database)
let appointments = [];

// POST /api/contact/appointment - Book an appointment
router.post('/appointment', (req, res) => {
    const { name, email, phone, message, preferredDate } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({
            success: false,
            error: 'Name, email, and phone are required'
        });
    }

    const appointment = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        message: message || '',
        preferredDate: preferredDate || null,
        createdAt: new Date().toISOString(),
        status: 'pending'
    };

    appointments.push(appointment);

    res.status(201).json({
        success: true,
        message: 'Appointment request received. We will contact you shortly.',
        appointmentId: appointment.id
    });
});

// POST /api/contact/message - Send a general message
router.post('/message', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            error: 'Name, email, and message are required'
        });
    }

    // In production, send email or store in database
    console.log('New message received:', { name, email, subject, message });

    res.json({
        success: true,
        message: 'Your message has been received. We will respond within 24 hours.'
    });
});

module.exports = router;
