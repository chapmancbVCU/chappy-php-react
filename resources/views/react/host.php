<?php $this->start('head') ?>
  <?= Core\Lib\React\Vite::tags('resources/js/app.jsx'); ?>

  <?php
  function csrf_value() {
    $html = csrf();
    if (preg_match('/value="([^"]+)"/', (string)$html, $m)) return $m[1];
    return '';
}
$token = csrf_value(); 
  ?>
<?php $this->end(); ?>

<?php $this->start('body') ?>
  <div
    id="app"
    data-csrf="<?= htmlspecialchars($token, ENT_QUOTES, 'UTF-8') ?>"
    data-component="<?= htmlspecialchars($this->component ?? 'home', ENT_QUOTES, 'UTF-8'); ?>"
    data-props='<?= htmlspecialchars(json_encode($this->props ?? []), ENT_QUOTES, "UTF-8"); ?>'>
  </div>
<?php $this->end(); ?>
