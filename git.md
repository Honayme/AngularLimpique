# Assurez-vous d'être sur la branche dev
git checkout dev

# Ajoutez les modifications
git add .

# Effectuez le commit
git commit -m "Votre message de commit ici"

# Basculez sur la branche master
git checkout master

# Fusionnez les changements de dev dans master
git merge dev

# Poussez les changements vers le dépôt distant
git push origin master
