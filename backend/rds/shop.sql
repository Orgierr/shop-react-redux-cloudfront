create extension if not exists "uuid-ossp";

create table products(
    id uuid primary key not null default uuid_generate_v4(),
    title text not null,
    description text,
    img text,
    price int
);

create table stocks(
    product_id uuid,
    count int,
    foreign key (product_id) references products(id) on delete cascade
);

CREATE OR REPLACE FUNCTION add_examples(total int) 
returns void AS 
	$$ DECLARE id uuid;
	BEGIN FOR i IN 1..total LOOP id = uuid_generate_v4();
	insert into
	    products(id, title, description, price)
	values(id, '|| i::text,' || i :: text, 200 + i);
	insert into stocks(product_id,count) values(id,i);
	E 
END LOOP; 

END;

$$ LANGUAGE plpgsql;

select add_examples(10);

insert into
    products(id, title, description, price, img)
values(
        '224125f3-e382-42a0-98d5-685bb4a4347e',
        'Product Title 1',
        'This product 1',
        1,
        'https://nodejs-aws-store-products.s3.eu-central-1.amazonaws.com/ahmed-almakhzanji-kshkB1i5_5o-unsplash.jpg'
    );

insert into
    stocks(product_id, count)
values('224125f3-e382-42a0-98d5-685bb4a4347e', 1);

insert into
    products(id, title, description, price, img)
values(
        '7ca2a980-fce5-409c-b383-805e888c88b1',
        'Product Title 2',
        'This product 2',
        2,
        'https://nodejs-aws-store-products.s3.eu-central-1.amazonaws.com/alabaster-co-ERDtf2D6xPY-unsplash.jpg'
    );

insert into
    stocks(product_id, count)
values('7ca2a980-fce5-409c-b383-805e888c88b1', 2);

insert into
    products(id, title, description, price, img)
values(
        '94b3ce19-84d8-4f39-8f1a-2c7262ddb05f',
        'Product Title 2',
        'This product 2',
        3,
        'https://nodejs-aws-store-products.s3.eu-central-1.amazonaws.com/daria-nepriakhina-xY55bL5mZAM-unsplash.jpg'
    );

insert into
    stocks(product_id, count)
values('94b3ce19-84d8-4f39-8f1a-2c7262ddb05f', 2);

insert into
    products(id, title, description, price, img)
values(
        '7f9a0233-78e4-4fea-bb8d-4425358377da',
        'Product Title 2',
        'This product 2',
        4,
        'https://nodejs-aws-store-products.s3.eu-central-1.amazonaws.com/jon-tyson-pFnvc1Cu6zI-unsplash.jpg'
    );

insert into
    stocks(product_id, count)
values('7f9a0233-78e4-4fea-bb8d-4425358377da', 2);