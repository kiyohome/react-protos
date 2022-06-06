/*
DBスキーマを変更した後にGraphQLのスキーマ変更の手動実行が必要
*/
select graphql.rebuild_schema();

/*
like_operation.sqlを実行している場合は上記SQLに続けて下記のINSERTも必要
*/
insert into graphql._field(parent_type_id, type_id, constant_name, is_not_null, is_array, description)
    select
        gt.id as parent_type_id,
        gt.graphql_type_id type_id,
        ops.constant_name as constant_name,
        false as is_not_null,
        false as is_array,
        null::text as description
    from
        graphql.type gt
        join (
            values
                ('like')
        ) ops(constant_name)
            on true
    where
        gt.meta_kind = 'FilterType'
        and gt.graphql_type_id = graphql.type_id('String');
