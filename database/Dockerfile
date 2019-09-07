FROM mongo:latest

COPY reservations.json /reservations.json

CMD mongoimport --host database --db Reservations --type json --file /reservations.json --jsonArray