import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  dateOfBirth: yup.date()
    .required('Date of birth is required')
    .test('age', 'Must be 5 years or younger', (value) => {
      if (!value) return false;
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      return age <= 5;
    }),
  gender: yup.string().required('Gender is required'),
  parentFirstName: yup.string().required('Parent first name is required'),
  parentLastName: yup.string().required('Parent last name is required'),
  parentPhone: yup.string().required('Parent phone number is required'),
  parentEmail: yup.string().email('Invalid email').nullable(),
  emergencyContactName: yup.string().required('Emergency contact name is required'),
  emergencyContactPhone: yup.string().required('Emergency contact phone is required'),
  allergies: yup.string().nullable(),
  medicalConditions: yup.string().nullable(),
  dietaryRestrictions: yup.string().nullable(),
  sessionType: yup.string().required('Session type is required')
});

const ChildForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('/api/children', data);
      
      toast.success('Child registered successfully!');
      reset();
    } catch (err) {
      setError(err.response?.data?.message || 'Error registering child');
      toast.error('Failed to register child');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h4 className="mb-4">Register New Child</h4>
        
        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register('firstName')}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register('lastName')}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  {...register('dateOfBirth')}
                  isInvalid={!!errors.dateOfBirth}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dateOfBirth?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  {...register('gender')}
                  isInvalid={!!errors.gender}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.gender?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          <h5 className="mt-4 mb-3">Parent/Guardian Information</h5>

          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Parent First Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register('parentFirstName')}
                  isInvalid={!!errors.parentFirstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.parentFirstName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Parent Last Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register('parentLastName')}
                  isInvalid={!!errors.parentLastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.parentLastName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Parent Phone</Form.Label>
                <Form.Control
                  type="tel"
                  {...register('parentPhone')}
                  isInvalid={!!errors.parentPhone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.parentPhone?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Parent Email (Optional)</Form.Label>
                <Form.Control
                  type="email"
                  {...register('parentEmail')}
                  isInvalid={!!errors.parentEmail}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.parentEmail?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          <h5 className="mt-4 mb-3">Emergency Contact</h5>

          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Emergency Contact Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register('emergencyContactName')}
                  isInvalid={!!errors.emergencyContactName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.emergencyContactName?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Emergency Contact Phone</Form.Label>
                <Form.Control
                  type="tel"
                  {...register('emergencyContactPhone')}
                  isInvalid={!!errors.emergencyContactPhone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.emergencyContactPhone?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          <h5 className="mt-4 mb-3">Additional Information</h5>

          <div className="row">
            <div className="col-md-12 mb-3">
              <Form.Group>
                <Form.Label>Allergies (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  {...register('allergies')}
                  isInvalid={!!errors.allergies}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.allergies?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 mb-3">
              <Form.Group>
                <Form.Label>Medical Conditions (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  {...register('medicalConditions')}
                  isInvalid={!!errors.medicalConditions}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.medicalConditions?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 mb-3">
              <Form.Group>
                <Form.Label>Dietary Restrictions (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  {...register('dietaryRestrictions')}
                  isInvalid={!!errors.dietaryRestrictions}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dietaryRestrictions?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 mb-3">
              <Form.Group>
                <Form.Label>Session Type</Form.Label>
                <Form.Select
                  {...register('sessionType')}
                  isInvalid={!!errors.sessionType}
                >
                  <option value="">Select session type</option>
                  <option value="half-day">Half Day</option>
                  <option value="full-day">Full Day</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.sessionType?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          <div className="d-grid gap-2">
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register Child'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ChildForm; 