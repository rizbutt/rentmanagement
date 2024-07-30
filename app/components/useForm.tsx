import { useState, useEffect } from 'react';

interface UseFormProps {
  initialValues: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
  validate?: (values: Record<string, any>) => Record<string, string>;
}

/**
 * Custom hook for managing form state, validation, and submission.
 */
export const useForm = ({ initialValues, onSubmit, validate }: UseFormProps) => {
  const [values, setValues] = useState(initialValues); // Form values
  const [errors, setErrors] = useState<Record<string, string>>({}); // Validation errors
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state

  // Handle form submission effect
  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        onSubmit(values); // Call the onSubmit function passed as prop
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  // Handle input value changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(values)
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(validate ? validate(values) : {}); // Run validation if provided
    setIsSubmitting(true);
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};
