#Tietokanta
Tietokanta oluiden tallentamiseen ja kommentointiin.

##user
-id
-username
-registeration_date
-email-address
-last_signed_on
-salt
-hash

##beer
-id
-brewery <foreing_key>
-name
-abv
-ibu
-info
-type <foreing_key>
-added_on_date

##beer_type
-id
-name
-abbrevation

##brewery
-id
-name
-location
-founded_on

##comments
-id
-date
-comment
-beer_id <foreing_key>
-user_id <foreing_key>

##images
-beer_id <foreing_key>
-added_by_user <foreing_key>
-image_name
-added_on
