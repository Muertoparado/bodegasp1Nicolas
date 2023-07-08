CREATE DATABASE backend_node;

USE backend_node;
CREATE TABLE inventarios(
    id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY,
    id_bodega BIGINT(20) UNSIGNED,
    id_producto BIGINT(20) UNSIGNED,
    cantidad INT(11),
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
alter table inventarios
rename COLUMN created__by to created_by;

CREATE TABLE productos(
    id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion VARCHAR(255),
    estado TINYINT(4),
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

drop table inventarios;

CREATE TABLE bodegas(
    id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY,
    nombre VARCHAR(255),
    id_responsable BIGINT(20) UNSIGNED,
    estado TINYINT(4),
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
drop table bodegas;

CREATE TABLE users(
    id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY,
    nombre VARCHAR(255),
    email VARCHAR(255),
    email_verified_at TIMESTAMP,
    estado TINYINT(4),
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    foto VARCHAR(255),
    password VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
alter table users
rename COLUMN create_by to created_by;

CREATE TABLE historiales(
    id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY,
    cantidad INT(11),
    id_bodega_origen BIGINT(20) UNSIGNED,
    id_bodega_destino BIGINT(20) UNSIGNED,
    id_inventario BIGINT(20) UNSIGNED,
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
alter table historiales
rename COLUMN created__by to created_by;

ALTER TABLE historiales ADD CONSTRAINT fk_id_inv FOREIGN KEY (id_inventario) REFERENCES inventarios(id);
ALTER TABLE inventarios ADD CONSTRAINT fk_id_bodega FOREIGN KEY (id_bodega) REFERENCES bodegas(id);
ALTER TABLE inventarios ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users(id);
ALTER TABLE inventarios ADD CONSTRAINT fk_update_by FOREIGN KEY (update_by) REFERENCES users(id);
ALTER TABLE inventarios ADD CONSTRAINT fk_id_producto FOREIGN KEY (id_producto) REFERENCES productos(id);

ALTER TABLE productos ADD CONSTRAINT fk_created_by_p FOREIGN KEY (created_by) REFERENCES users(id);
ALTER TABLE productos ADD CONSTRAINT fk_update_by_p FOREIGN KEY (update_by) REFERENCES users(id);
ALTER TABLE bodegas ADD CONSTRAINT fk_created_by_b FOREIGN KEY (created_by) REFERENCES users(id);
ALTER TABLE bodegas ADD CONSTRAINT fk_update_by_b FOREIGN KEY (update_by) REFERENCES users(id);
ALTER TABLE bodegas ADD CONSTRAINT fk_id_responsable FOREIGN KEY (id_responsable) REFERENCES users(id);
ALTER TABLE historiales ADD CONSTRAINT fk_update_by_h FOREIGN KEY (update_by) REFERENCES users(id);
ALTER TABLE historiales ADD CONSTRAINT fk_created_by_h FOREIGN KEY (created_by) REFERENCES users(id);

ALTER TABLE historiales ADD CONSTRAINT fk_id_bodega_origen FOREIGN KEY (id_bodega_origen) REFERENCES bodegas(id);
ALTER TABLE historiales ADD CONSTRAINT fk_id_bodega_destino FOREIGN KEY (id_bodega_destino) REFERENCES bodegas(id);

ALTER TABLE inventarios MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;


