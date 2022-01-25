-- Table: public.t_cart

-- DROP TABLE IF EXISTS public.t_cart;

CREATE TABLE IF NOT EXISTS public.t_cart
(
    f_id_fk integer NOT NULL,
    u_id_fk integer NOT NULL,
    f_qty integer NOT NULL,
    CONSTRAINT t_order_f_id_fk_fkey FOREIGN KEY (f_id_fk)
        REFERENCES public.t_user (u_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT t_order_u_id_fk_fkey FOREIGN KEY (u_id_fk)
        REFERENCES public.t_user (u_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.t_cart
    OWNER to postgres;

COMMENT ON TABLE public.t_cart
    IS 'This table is volatile and is to be updated frequently by the API';


-- Table: public.t_food

-- DROP TABLE IF EXISTS public.t_food;

CREATE TABLE IF NOT EXISTS public.t_food
(
    f_id integer NOT NULL DEFAULT nextval('t_food_f_id_seq'::regclass),
    f_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    f_desc character varying(255) COLLATE pg_catalog."default",
    f_price money NOT NULL,
    f_category character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT t_food_pkey PRIMARY KEY (f_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.t_food
    OWNER to postgres;


-- Table: public.t_transactions

-- DROP TABLE IF EXISTS public.t_transactions;

CREATE TABLE IF NOT EXISTS public.t_transactions
(
    tr_id integer NOT NULL DEFAULT nextval('t_transactions_tr_id_seq'::regclass),
    f_id_fk integer NOT NULL,
    u_id_fk integer NOT NULL,
    tr_total money,
    tr_time timestamp with time zone DEFAULT '2022-01-24 11:14:53.860376-05'::timestamp with time zone,
    CONSTRAINT t_transactions_pkey PRIMARY KEY (tr_id),
    CONSTRAINT t_transactions_f_id_fkey FOREIGN KEY (f_id_fk)
        REFERENCES public.t_food (f_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT t_transactions_u_id_fkey FOREIGN KEY (u_id_fk)
        REFERENCES public.t_user (u_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.t_transactions
    OWNER to postgres;


   
-- Table: public.t_user

-- DROP TABLE IF EXISTS public.t_user;

CREATE TABLE IF NOT EXISTS public.t_user
(
    u_id integer NOT NULL DEFAULT nextval('t_user_u_id_seq'::regclass),
    u_name character varying(12) COLLATE pg_catalog."default" NOT NULL,
    u_password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    u_email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    u_is_employee boolean DEFAULT false,
    CONSTRAINT t_user_pkey PRIMARY KEY (u_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.t_user
    OWNER to postgres;