# Use an official Python runtime as the base image
FROM python:3.11

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install the dependencies
RUN pip install -r requirements.txt

# Copy the rest of the project files
COPY . .

# Expose the port that Django will run on
EXPOSE 8000

# Run migrations and start the Django development server
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
