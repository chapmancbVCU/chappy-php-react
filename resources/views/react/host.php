<?php $this->start('head') ?>
  <?= App\Support\Vite::tags('resources/js/app.jsx'); ?>
<?php $this->end(); ?>

<?php $this->start('body') ?>
  <div
    id="app"
    data-props='<?= htmlspecialchars(
      json_encode($this->props ?? []),
      ENT_QUOTES,
      "UTF-8"
    ); ?>'
  ></div>
<?php $this->end(); ?>
