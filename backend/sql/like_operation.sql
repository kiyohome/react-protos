/*
文字列検索で前方一致を使いたかったのでsupabaseのGraphQLをカスタマイズ

下記を参考にfunctionを変更し、GraphQLスキーマを再ビルド

supabase + GraphQL の String 検索で like を使えるようにする
https://zenn.dev/sora_kumo/articles/718f9af36891c6

元のソースファイル
https://github.com/supabase/pg_graphql/blob/6b243f7ce9e8d04f4d88839bd34fd7574459c4f7/src/sql/resolve/clause/filter/text_to_comparison_op.sql
*/

create or replace function graphql.text_to_comparison_op(text)
    returns graphql.comparison_op
    language sql
    immutable
    as
$$
    select
        case $1
            when 'eq' then '='
            when 'lt' then '<'
            when 'lte' then '<='
            when 'neq' then '<>'
            when 'gte' then '>='
            when 'gt' then '>'
            when 'like' then 'like'
            else graphql.exception('Invalid comaprison operator')
        end::graphql.comparison_op
$$;

alter type graphql.comparison_op add value 'like';
