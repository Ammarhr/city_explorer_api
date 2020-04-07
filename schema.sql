DROP TABLE IF EXISTS locationInfo ;

CREATE TABLE locationInfo (
	id SERIAL PRIMARY KEY,
	search_query VARCHAR(255),
	formatted_query VARCHAR(255),
	 latitude NUMERIC(10, 7),
           longitude NUMERIC(10, 7)
);