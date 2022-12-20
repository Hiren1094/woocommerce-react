# WooCommerce With React JS

This demo for "Simple Product" with login user so please check below step and configure accordingly.

You can get all required plugins [here](https://github.com/Hiren1094/woocommerce-react/tree/main/WordPress).

## Getting Started

* PHP version should be (PHP 8.0.19) and node version should be (18.7.0).
  
  ```
  WordPress (6.1.1)
  WooCommerce (7.2.0)
  WP GraphQL (1.13.7)
  WPGraphQL JWT Authentication (0.6.0)
  WPGraphQL WooCommerce (WooGraphQL) (0.11.2)

  ```

* Install and activate [WPGraphQL](https://wordpress.org/plugins/wp-graphql/), [WooCommerce](https://wordpress.org/plugins/woocommerce/), [WPGraphQL WooCommerce (WooGraphQL)](https://github.com/wp-graphql/wp-graphql-woocommerce) and [WPGraphQL JWT Authentication](https://github.com/wp-graphql/wp-graphql-jwt-authentication)

* Add below rules in 'wp-config.php' once you installed above plugins.

```
define( 'GRAPHQL_JWT_AUTH_SECRET_KEY', 'your-secret-token' );
```

* Add below filters if you want to increase expire limit for login. 

```
function custom_jwt_expiration( $expiration ) {
	return 86400; // Second for 1 day
}
add_filter( 'graphql_jwt_auth_expire', 'custom_jwt_expiration', 10 );
```

* Clone main branch and run below command for install packages & run project.

```
npm install
npm start
```

* Create ".env.development.local" file in root & add graphql url with same name of variable.

```
REACT_APP_GRAPHQL_URL = http://localhost/graphql
``` 
