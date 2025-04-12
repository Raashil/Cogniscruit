# Use official Python image
FROM python:3.9

# Set working directory
WORKDIR /worker

# Copy current directory contents into the container
COPY . /worker

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# # Expose port 5000 for Flask
# EXPOSE 5001

# Command to run the worker
CMD ["python", "worker.py"]
