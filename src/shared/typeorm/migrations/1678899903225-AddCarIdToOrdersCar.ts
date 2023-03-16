import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCarIdToOrdersCar1678899903225 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          'orders_cars',
          new TableColumn({
            name: 'car_id',
            type: 'uuid',
            isNullable: true,
          }),
        );
    
        await queryRunner.createForeignKey('orders_cars',
          new TableForeignKey({
            name: 'OrdersCarsCar',
            columnNames: ['car_id'],
            referencedTableName: 'cars',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders_cars', 'OrdersCarsCar');
        await queryRunner.dropColumn('orders_cars', 'car_id');
      }


}
