import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCars1671406894935 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cars',
                columns: [
                    {name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()'},
                    {name: 'model', type: 'varchar'},
                    {name: 'color', type: 'varchar'},
                    {name: 'plate', type: 'varchar'},
                    {name: 'mileage', type: 'decimal', precision: 10, scale: 3},
                    {name: 'seats', type: 'int'},
                    {name: 'price', type: 'decimal', precision: 10, scale: 2},
                    {name: 'year', type: 'int'},
                    {name: 'created_at', type: 'timestamp', default: 'now()'},
                    {name: 'updated_at', type: 'timestamp', default: 'now()'}
                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cars');
    }

}
