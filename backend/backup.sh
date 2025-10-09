#!/bin/bash

# Backup directory
BACKUP_DIR="/home/abc/test3215"

# Create backup folder if not exists
mkdir -p "$BACKUP_DIR"

# Timestamp in format: YYYY-MM-DD_HH-MM-SS
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

# Run mongodump inside the container (replace with your container ID or name)
sudo docker exec c762c6e8e2a0 mongodump --out /data/backup_$TIMESTAMP

# Copy backup to host
sudo docker cp c762c6e8e2a0:/data/backup_$TIMESTAMP "$BACKUP_DIR/"

# Keep only last 5 backups
ls -dt "$BACKUP_DIR"/backup_* | tail -n +6 | xargs rm -rf

echo "✅ Backup completed: $BACKUP_DIR/backup_$TIMESTAMP"
 
