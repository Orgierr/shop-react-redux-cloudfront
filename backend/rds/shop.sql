create extension if not exists "uuid-ossp";

create table products(
  id uuid primary key not null default uuid_generate_v4(),
  title text not null,
  description text,
  price int
);

create table stocks(
  product_id uuid,
  count  int,
  foreign key (product_id) references products(id) on delete cascade
);

CREATE OR REPLACE FUNCTION add_examples(total int) returns void AS $$
DECLARE
  id uuid;
BEGIN
	FOR i IN 1..total LOOP
    id = uuid_generate_v4();
	  insert into products(id,title,description,price) values(id,'Product Title'|| i::text,'This product ...'|| i::text,200+i);
    insert into stocks(product_id,count) values(id,i);
	END LOOP;
END;
$$ LANGUAGE plpgsql;

select add_examples(10);