# Workshop Management System API Documentation

## Introduction
This document provides details about the APIs implemented in Task 1 of the Workshop Management System. 
---

## 1. Create Workshop
**Endpoint**: `/api/workshops`  
**Method**: `POST`  
**Headers**:
- `Authorization: Bearer <MENTOR_ID_TOKEN>`

**Request Body**:
```json
{
    "title": "Node.js",
    "mentor": "xyz",
    "activities": [
        { "name": "Introduction", "date": "2025-01-20" },
        { "name": " Lab", "date": "2025-01-21" }
    ]
}

## 3. updateWorkshop
**Endpoint**: `/api/workshops/:id`  
**Method**: `POST`  
**Headers**:
- `Authorization: Bearer <MENTOR_ID_TOKEN>`
**Request Body**:
```json

{
    "title": "Updated Workshop Title",
    "mentor": "John Smith",
    "activities": [
        { "name": "Updated Activity", "date": "2025-01-22" }
    ]
}

## 4. deleteWorkshop
**Endpoint**: `/api/workshops/:id`  
**Method**: `DELETE`  
**Headers**:
- `Authorization: Bearer <MENTOR_ID_TOKEN>`


## 5. getWorkshopById
**Endpoint**: `/api/workshops/:id`  
**Method**: `GET`  
**Headers**:
- `Authorization: Bearer <MENTOR_ID_TOKEN>`

## 6. enrollLearner

**Endpoint**: `/api/workshops/:id/enroll`  
**Method**: `POST`  
**Headers**:
- `Authorization: Bearer <LEARNER_ID_TOKEN>`

**Request Body**:
```json
{
    "learnerId": "learner123",
    "name": "abc"
}

## 7. getLearnerEnrollments
**Endpoint**: `/api/learners/:learnerid/enrollments`  
**Method**: `GET`  
**Headers**:
- `Authorization: Bearer <Learner_ID_TOKEN>`

**Request Body**:
```json

[
    {
        "id": "workshop123",
        "title": "Node.js ",
        "mentor": "abb",
        "activities": [
            { "name": "Introduction", "date": "2025-01-20" },
            { "name": "Lab", "date": "2025-01-21" }
        ],
        "enrolledLearners": [
            { "learnerId": "learner123", "name": "Jane Doe" }
        ]
    }
]


